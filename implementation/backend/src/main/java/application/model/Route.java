package application.model;

import java.util.List;

public class Route {
    private long distance; // Distance in meters
    private long duration; // Duration in seconds
    private String startAddress;
    private String endAddress;
    private List<RouteStep> steps;
    private String polyline;

    public long getDistance() {
        return distance;
    }

    public void setDistance(long distance) {
        this.distance = distance;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getStartAddress() {
        return startAddress;
    }

    public void setStartAddress(String startAddress) {
        this.startAddress = startAddress;
    }

    public String getEndAddress() {
        return endAddress;
    }

    public void setEndAddress(String endAddress) {
        this.endAddress = endAddress;
    }

    public List<RouteStep> getSteps() {
        return steps;
    }

    public void setSteps(List<RouteStep> steps) {
        this.steps = steps;
    }

    public String getPolyline() {
        return polyline;
    }

    public void setPolyline(String polyline) {
        this.polyline = polyline;
    }

    @Override
    public String toString() {
        return "Route{" +
                "distance= " + distance + "m \n" +
                ", duration= " + duration + "s \n" +
                ", startAddress= " + startAddress +  '\n' +
                ", endAddress= " + endAddress +  '\n' +
                ", steps= " + steps +
                '}';
    }
}
