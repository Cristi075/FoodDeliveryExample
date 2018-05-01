package application.service;

import application.model.Notification;
import application.model.Order;
import application.model.User;

import java.util.List;

public interface NotificationService {

    List<Notification> findByOrder(Order order);

    List<Notification> findNewByOrder(Order order);

    List<Notification> findByUser(User user);

    List<Notification> findNewByUser(User user);

    Notification saveNotification(Notification notification);

    Notification updateNotification(Notification notification);
}
