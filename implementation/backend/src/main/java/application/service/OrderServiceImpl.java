package application.service;

import application.model.Order;
import application.model.User;
import application.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service("orderService")
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> findByOwner(User owner) {
        List<Order> result = this.findAll().parallelStream()
                .filter(order -> order.getOwner().equals(owner))
                .collect(Collectors.toList());

        return result;
    }

    @Override
    public Order findById(int id) {
        return this.orderRepository.findOne(id);
    }

    @Override
    public List<Order> findAll() {
        return this.orderRepository.findAll();
    }

    @Override
    public Order saveOrder(Order order) {
        return this.orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Order order) {
        return this.orderRepository.save(order);
    }

    @Override
    public void deleteOrderById(int id) {
        this.orderRepository.delete(id);
    }

}
