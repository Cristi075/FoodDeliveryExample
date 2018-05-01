package application.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name="User")
@Inheritance(strategy=InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Column(name="username", unique=true, nullable=false)
    private String username;

    @NotBlank
    @JsonIgnore
    @Column(name="password", nullable=false)
    private String password;

    @NotBlank
    @Column(name="fullName", nullable=false)
    private String fullName;

    @NotBlank
    @Column(name="email", nullable=false)
    private String email;

    @NotBlank
    @Column(name="phoneNumber", nullable=false)
    private String phoneNumber;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="User_has_Role",
            joinColumns = { @JoinColumn(name = "User_id")},
            inverseJoinColumns = { @JoinColumn(name = "Role_Id")}
    )
    private Set<Role> roles = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, orphanRemoval = true, mappedBy = "owner")
    private Set<Address> addresses = new HashSet<>();

    public User() {
    }

    public User(String username, String password, String fullName, Set<Role> roles) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.roles = roles;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    public boolean isAdmin(){
        return this.getRoles().stream().filter(r -> Objects.equals(r.getName(), "ADMIN")).count() != 0;
    }

    public boolean isEmployee(){
        return this.getRoles().stream().filter(r -> Objects.equals(r.getName(), "EMPLOYEE")).count() != 0;
    }

    public boolean isClient(){
        return this.getRoles().stream().filter(r -> Objects.equals(r.getName(), "CLIENT")).count() != 0;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (id != user.id) return false;
        if (username != null ? !username.equals(user.username) : user.username != null) return false;
        if (password != null ? !password.equals(user.password) : user.password != null) return false;
        if (fullName != null ? !fullName.equals(user.fullName) : user.fullName != null) return false;
        return roles != null ? roles.equals(user.roles) : user.roles == null;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (fullName != null ? fullName.hashCode() : 0);
        result = 31 * result + (roles != null ? roles.hashCode() : 0);
        return result;
    }
}
