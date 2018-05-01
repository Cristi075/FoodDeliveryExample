package application.controller;

import application.exceptions.DuplicateException;
import application.model.User;
import application.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfileRestApiController {

    private final UserService userService;

    public ProfileRestApiController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/profile/", method = RequestMethod.GET)
    public ResponseEntity<?> getProfile(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = this.userService.findByUsername(username);

        if (user == null) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/profile/", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProfile(@RequestBody User newProfile){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = this.userService.findByUsername(username);

        if (user == null) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        user.setEmail(newProfile.getEmail());
        user.setFullName(newProfile.getFullName());
        user.setPhoneNumber(newProfile.getPhoneNumber());

        try {
            user = this.userService.updateUser(user);
        } catch (DuplicateException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
