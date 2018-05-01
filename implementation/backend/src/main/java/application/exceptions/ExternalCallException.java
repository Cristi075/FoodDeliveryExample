package application.exceptions;

public class ExternalCallException extends Exception {
    public ExternalCallException() {
        this("External service could not be called");
    }

    public ExternalCallException(String message) {
        super(message);
    }
}
