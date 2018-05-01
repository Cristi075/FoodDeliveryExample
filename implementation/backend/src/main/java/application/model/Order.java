package application.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="Address_id")
    private Address address;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<ProductOrder> productOrders;

    @Column(name="status", nullable=false)
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public User getOwner(){
        return address.getOwner();
    }

    public Set<ProductOrder> getProductOrders() {
        return productOrders;
    }

    public void setProductOrders(Set<ProductOrder> productOrders) {
        this.productOrders = productOrders;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getPrice(){
        int sum = 0;

        for(ProductOrder productOrder: this.getProductOrders()){
            sum+= productOrder.getProduct().getPrice() * productOrder.getQuantity();
        }

        return sum;
    }
}
