package io.github.sedmugen.expensetracker.exception;

/**
 * Exception thrown when user account is inactive
 */
public class AccountInactiveException extends RuntimeException {

    public AccountInactiveException() {
        super("Account is inactive. Please contact support.");
    }
}