package praktyki.zadanie.exceptions;

public class MedicineNotFoundExceptionResponse {
    private String MedicineNotFound;

    public String getMedicineNotFound() {
        return MedicineNotFound;
    }

    public void setMedicineNotFound(String medicineNotFound) {
        MedicineNotFound = medicineNotFound;
    }

    public MedicineNotFoundExceptionResponse(String medicineNotFound) {
        MedicineNotFound = medicineNotFound;
    }
}
