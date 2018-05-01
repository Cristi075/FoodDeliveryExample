package application.service;

import application.exceptions.ExternalCallException;
import application.model.Order;
import application.model.Route;
import application.model.RouteStep;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteServiceImpl implements RouteService{
    @Value("${routes.apiKey}")
    private String apiKey;

    @Value("${routes.startAddress}")
    private String startAddress;

    @Value("${routes.baseUrl}")
    private String baseUrl;

    @Override
    public Route getRoute(Order order) throws ExternalCallException {
        String query = this.baseUrl
                + "?origin=" + this.startAddress.replace(" ", "+")
                + "&destination=" + order.getAddress().toString().replace(" ","+")
                + "&key=" + this.apiKey;

        //System.out.println(query);
        try {
            URL url = new URL(query);
            // Connect to the external service
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            if(connection.getResponseCode() == HttpURLConnection.HTTP_OK){
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));

                String response = reader.lines().collect(Collectors.joining());

                JSONObject jsonObject = new JSONObject(response);
                JSONObject routeJsonObject = jsonObject
                        .getJSONArray("routes") // get the array containing routes
                        .getJSONObject(0) // get the first route
                        .getJSONArray("legs")
                        .getJSONObject(0); // Get the first object from the 'legs' field

                Route result = new Route();

                long totalDistance = routeJsonObject
                        .getJSONObject("distance")
                        .getLong("value");

                result.setDistance(totalDistance);

                long totalDuration = routeJsonObject
                        .getJSONObject("duration")
                        .getLong("value");

                result.setDuration(totalDuration);

                result.setStartAddress(routeJsonObject.getString("start_address"));
                result.setEndAddress(routeJsonObject.getString("end_address"));

                List<RouteStep> steps = new ArrayList<>();
                JSONArray jsonSteps = routeJsonObject.getJSONArray("steps");

                for(int index=0;index<jsonSteps.length(); index++){
                    JSONObject jsonStep = jsonSteps.getJSONObject(index);
                    long duration = jsonStep.getJSONObject("duration").getLong("value");
                    long distance = jsonStep.getJSONObject("distance").getLong("value");
                    String instruction = jsonStep.getString("html_instructions");
                    RouteStep step = new RouteStep(duration, distance, instruction);
                    steps.add(step);
                }

                result.setSteps(steps);

                String polyline = jsonObject
                        .getJSONArray("routes") // get the array     containing routes
                        .getJSONObject(0) // get the first route
                        .getJSONObject("overview_polyline")
                        .getString("points");
                result.setPolyline(polyline);

                return result;
            } else {
                // TODO: Add logging
                connection.disconnect();
                throw new ExternalCallException("Connection with the Google Location service could not be established");
            }
        } catch (MalformedURLException e) {
            throw new ExternalCallException("Invalid location service URL");
        } catch (IOException e) {
            throw new ExternalCallException("Could not read the reply of the Google Location service");
        }
    }

}
