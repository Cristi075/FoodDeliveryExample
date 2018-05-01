package application.controller;

import application.model.Notification;
import application.model.User;
import application.service.NotificationService;
import application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NotificationRestApiController {

    private final NotificationService notificationService;

    private final UserService userService;

    @Autowired
    public NotificationRestApiController(NotificationService notificationService, UserService userService) {
        this.notificationService = notificationService;
        this.userService = userService;
    }

    @RequestMapping(value = "/notification/", method = RequestMethod.GET)
    public ResponseEntity<?> getAllNotifications() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = this.userService.findByUsername(auth.getName());

        List<Notification> notificationList = this.notificationService.findByUser(user);

        if (notificationList.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(notificationList, HttpStatus.OK);
    }

    @RequestMapping(value = "/notification/new", method = RequestMethod.GET)
    public ResponseEntity<?> getNewNotifications() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = this.userService.findByUsername(auth.getName());

        if(user == null){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        List<Notification> notificationList = this.notificationService.findNewByUser(user);

        if (notificationList.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(notificationList, HttpStatus.OK);
    }


    @RequestMapping(value = "/notification/id={id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateNotification(@PathVariable("id") int id, @RequestBody Notification notification) {
        Notification updated = this.notificationService.updateNotification(notification);

        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
}
