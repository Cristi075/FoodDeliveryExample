package application.model.builders;

import application.model.Notification;
import application.model.Order;

import java.util.Date;

public class NotificationBuilder {
    private String text;
    private Date createdAt;
    private Order order;

    public NotificationBuilder setText(String text) {
        this.text = text;
        return this;
    }

    public NotificationBuilder setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public NotificationBuilder setOrder(Order order) {
        this.order = order;
        return this;
    }

    public Notification createNotification() {
        return new Notification( text, createdAt, order);
    }
}