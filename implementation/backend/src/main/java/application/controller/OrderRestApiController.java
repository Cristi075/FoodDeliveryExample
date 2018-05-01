package application.controller;

import application.model.Notification;
import application.model.Order;
import application.model.ProductOrder;
import application.model.User;
import application.model.builders.NotificationBuilder;
import application.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderRestApiController {

    private final OrderService orderService;
    private final AddressService addressService;
    private final ProductService productService;
    private final UserService userService;
    private final NotificationService notificationService;

    @Autowired
    public OrderRestApiController(OrderService orderService, AddressService addressService, ProductService productService, UserService userService, NotificationService notificationService) {
        this.orderService = orderService;
        this.addressService = addressService;
        this.productService = productService;
        this.userService = userService;
        this.notificationService = notificationService;
    }

    @RequestMapping(value = "/order/", method = RequestMethod.GET)
    public ResponseEntity<?> getAllOrders() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = this.userService.findByUsername(username);

        if (user == null) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        List<Order> orders;

        if(user.isEmployee()){
            orders = this.orderService.findAll();
        } else {
            orders = this.orderService.findByOwner(user);
        }

        if (orders.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @RequestMapping(value = "/order/id={id}", method = RequestMethod.GET)
    public ResponseEntity<?> getOrder(@PathVariable("id") int id) {
        Order order = this.orderService.findById(id);

        if (order == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @RequestMapping(value = "/order/", method = RequestMethod.POST)
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        Order newOrder;

        order.setAddress(this.addressService.findById(order.getAddress().getId()));
        order.setStatus("NEW");

        for(ProductOrder productOrder: order.getProductOrders()){
            productOrder.setOrder(order);
            productOrder.setProduct(this.productService.findById(productOrder.getProduct().getId()));
        }

        newOrder = this.orderService.saveOrder(order);

        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/order/id={id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateOrder(@PathVariable("id") int id, @RequestBody Order order) {
        Order currentOrder = this.orderService.findById(id);

        for(ProductOrder productOrder: order.getProductOrders()){
            productOrder.setOrder(order);
        }

        if (currentOrder == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        boolean notify = false;
        if (currentOrder.getStatus().equals("NEW") && order.getStatus().equals("DONE")){
            notify = true;
        }

        currentOrder = this.orderService.updateOrder(order);

        if (notify){
            NotificationBuilder builder = new NotificationBuilder();
            builder.setCreatedAt(new Date());
            builder.setOrder(currentOrder);
            builder.setText("Your order has arrived");
            this.notificationService.saveNotification(builder.createNotification());
        }

        return new ResponseEntity<>(currentOrder, HttpStatus.OK);
    }

    @RequestMapping(value = "/order/id={id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteOrder(@PathVariable("id") int id) {
        Order order = this.orderService.findById(id);

        if (order == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        this.orderService.deleteOrderById(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
