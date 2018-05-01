package application.controller;

import application.model.Address;
import application.model.User;
import application.service.AddressService;
import application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AddressRestApiController {

    private final AddressService addressService;
    private final UserService userService;

    @Autowired
    public AddressRestApiController(AddressService addressService, UserService userService) {
        this.addressService = addressService;
        this.userService = userService;
    }

    @RequestMapping(value = "/address/", method = RequestMethod.GET)
    public ResponseEntity<?> listAllAddress() {
        List<Address> addresses = this.addressService.findAll();

        if (addresses.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = this.userService.findByUsername(username);
        List<Address> result = addresses.parallelStream()
                .filter(addr -> addr.getOwner().equals(currentUser))
                .collect(Collectors.toList());

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/address/id={id}", method = RequestMethod.GET)
    public ResponseEntity<?> getAddress(@PathVariable("id") int id) {
        Address address = this.addressService.findById(id);

        if (address == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(address, HttpStatus.OK);
    }

    @RequestMapping(value = "/address/", method = RequestMethod.POST)
    public ResponseEntity<?> createAddress(@RequestBody Address address) {
        Address newAddress;

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = this.userService.findByUsername(username);
        address.setOwner(currentUser);

        newAddress = this.addressService.saveAddress(address);

        return new ResponseEntity<>(newAddress, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/address/id={id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateAddress(@PathVariable("id") int id, @RequestBody Address address) {
        Address currentAddress = this.addressService.findById(id);

        if (currentAddress == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = this.userService.findByUsername(username);
        address.setOwner(currentUser);

        currentAddress = this.addressService.updateAddress(address);

        return new ResponseEntity<>(currentAddress, HttpStatus.OK);
    }

    @RequestMapping(value = "/address/id={id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteAddress(@PathVariable("id") int id) {
        Address address = this.addressService.findById(id);

        if (address == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        this.addressService.deleteAddressById(address.getId());
        return new ResponseEntity<>(address,HttpStatus.OK);
    }
}
