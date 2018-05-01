package application.service;


import application.model.Order;
import application.model.User;

import java.util.List;

public interface OrderService {

    List<Order> findByOwner(User owner);

    Order findById(int id);

    List<Order> findAll();

    Order saveOrder(Order order);

    Order updateOrder(Order order);

    void deleteOrderById(int id);
}
