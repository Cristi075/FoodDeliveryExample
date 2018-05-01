package application.service;

import application.model.Address;

import java.util.List;

public interface AddressService {
    Address findById(int id);

    List<Address> findAll();

    Address saveAddress(Address address);

    Address updateAddress(Address address);

    void deleteAddressById(int id);
}
