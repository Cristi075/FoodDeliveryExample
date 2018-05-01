package application.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="seen")
    private boolean seen;

    @Column(name="text")
    private String text;

    @Column(name="createdAt")
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "Order_id")
    private Order order;

    public Notification() {
    }

    public Notification(String text, Date createdAt, Order order) {
        this.seen = false;
        this.text = text;
        this.createdAt = createdAt;
        this.order = order;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
