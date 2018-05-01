package application.service;

import application.model.Address;
import application.repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("addressService")
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public Address findById(int id) {
        return this.addressRepository.findOne(id);
    }

    @Override
    public List<Address> findAll() {
        return this.addressRepository.findAll();
    }

    @Override
    public Address saveAddress(Address address) {
        return this.addressRepository.save(address);
    }

    @Override
    public Address updateAddress(Address address) {
        return this.addressRepository.save(address);
    }

    @Override
    public void deleteAddressById(int id) {
        this.addressRepository.delete(id);
    }
}
