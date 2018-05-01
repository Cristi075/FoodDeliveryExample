package application.service;

import application.model.Notification;
import application.model.Order;
import application.model.User;
import application.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final OrderService orderService;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository, OrderService orderService) {
        this.notificationRepository = notificationRepository;
        this.orderService = orderService;
    }


    @Override
    public List<Notification> findByOrder(Order order) {
        return this.notificationRepository.findByOrder(order);
    }

    @Override
    public List<Notification> findNewByOrder(Order order) {
        List<Notification> result = this.findByOrder(order).parallelStream()
                .filter(n -> !n.isSeen())
                .collect(Collectors.toList());

        return result;
    }

    @Override
    public List<Notification> findByUser(User user) {
        List<Order> orders = this.orderService.findByOwner(user);

        List<Notification> result = orders.parallelStream()
                .map(this.notificationRepository::findByOrder)
                .flatMap(List::stream)
                .collect(Collectors.toList());

        return result;
    }

    @Override
    public List<Notification> findNewByUser(User user) {
        List<Order> orders = this.orderService.findByOwner(user);

        List<Notification> result = orders.parallelStream()
                .map(this.notificationRepository::findByOrder)
                .flatMap(List::stream)
                .filter(n -> !n.isSeen())
                .collect(Collectors.toList());

        return result;
    }

    @Override
    public Notification saveNotification(Notification notification) {
        return this.notificationRepository.save(notification);
    }

    @Override
    public Notification updateNotification(Notification notification) {
        return this.saveNotification(notification);
    }
}
