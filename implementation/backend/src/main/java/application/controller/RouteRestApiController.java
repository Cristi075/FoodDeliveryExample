package application.controller;

import application.exceptions.ExternalCallException;
import application.model.Order;
import application.model.Route;
import application.service.OrderService;
import application.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RouteRestApiController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private RouteService routeService;

    @PreAuthorize("hasRole('ROLE_EMPLOYEE')")
    @RequestMapping(value = "/route/orderId={id}", method = RequestMethod.GET)
    public ResponseEntity<?> getRoute(@PathVariable("id") int orderId) {
        Order order = this.orderService.findById(orderId);

        if(order==null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        try {
            Route route = this.routeService.getRoute(order);
            return new ResponseEntity<>(route, HttpStatus.OK);

        } catch (ExternalCallException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
