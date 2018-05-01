package application.service;

import application.exceptions.ExternalCallException;
import application.model.Order;
import application.model.Route;

public interface RouteService {
    Route getRoute(Order order) throws ExternalCallException;
}
