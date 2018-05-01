package application.repositories;

import application.model.Notification;
import application.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    public List<Notification> findByOrder(Order order);
}
