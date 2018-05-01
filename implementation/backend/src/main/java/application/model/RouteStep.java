package application.model;

public class RouteStep {
    private long duration;
    private long distance;
    private String instruction;

    public RouteStep(long duration, long distance, String instruction) {
        this.duration = duration;
        this.distance = distance;
        this.instruction = instruction;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public long getDistance() {
        return distance;
    }

    public void setDistance(long distance) {
        this.distance = distance;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    @Override
    public String toString() {
        return "RouteStep{" +
                "duration=" + duration +
                ", distance=" + distance +
                ", instruction='" + instruction + '\'' +
                '}';
    }
}
