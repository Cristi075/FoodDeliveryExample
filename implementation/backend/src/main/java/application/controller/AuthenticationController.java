package application.controller;

import application.exceptions.DuplicateException;
import application.model.Role;
import application.model.User;
import application.security.AuthResponse;
import application.security.Credentials;
import application.service.AuthenticationService;
import application.service.RoleService;
import application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, UserService userService, RoleService roleService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.roleService = roleService;
    }

    @RequestMapping(value = "/login/", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody Credentials credentials){
        String username = credentials.getUsername();
        String password = credentials.getPassword();

        if (username == null || password == null){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        String token = this.authenticationService.login(credentials);

        return new ResponseEntity<>(new AuthResponse(token),HttpStatus.OK);
    }

    @RequestMapping(value = "/register/", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody User user){
        Set<Role> roles = new HashSet<>();
        Role role = this.roleService.findAllRoles()
                .stream()
                .filter(r -> r.getName().equals("CLIENT"))
                .findFirst()
                .get();
        roles.add(role);
        user.setRoles(roles);

        try {
            user = this.userService.saveUser(user);
        } catch (DuplicateException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(user, HttpStatus.CREATED);


    }
}
