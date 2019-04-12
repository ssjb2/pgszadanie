package praktyki.zadanie.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import praktyki.zadanie.entity.Medicine;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MedicineNotFoundException extends RuntimeException {
    public MedicineNotFoundException(String message) {
        super(message);
    }
}