package io.github.sedmugen.expensetracker.exception;

/**
 * Exception thrown when file size exceeds limit
 */
public class FileSizeLimitExceededException extends RuntimeException {

    public FileSizeLimitExceededException(long fileSize, long maxSize) {
        super(String.format("File size (%d bytes) exceeds maximum allowed size (%d bytes)",
                fileSize, maxSize));
    }
}