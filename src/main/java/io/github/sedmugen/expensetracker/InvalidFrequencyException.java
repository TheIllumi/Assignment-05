package io.github.sedmugen.expensetracker.exception;

/**
 * Exception thrown when frequency is invalid
 */
public class InvalidFrequencyException extends RuntimeException {

    public InvalidFrequencyException(String frequency) {
        super("Invalid frequency: " + frequency + ". Must be DAILY, WEEKLY, MONTHLY, or YEARLY.");
    }
}