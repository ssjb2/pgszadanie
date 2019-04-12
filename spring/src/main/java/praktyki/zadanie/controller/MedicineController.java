package praktyki.zadanie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import praktyki.zadanie.entity.Medicine;
import praktyki.zadanie.services.MedicineService;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    MedicineService medicineService;

    @PostMapping("")
    public ResponseEntity<?> createMedicine(@Valid @RequestBody Medicine medicine, BindingResult result, Principal principal) {
        Medicine medicine1 = medicineService.saveOrUpdateMedicine(medicine, principal.getName());
        return new ResponseEntity<Medicine>(medicine1, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMedicineById(@PathVariable Long id, Principal principal) {


        Medicine medicine = medicineService.findMedicineById(id, principal.getName());
        return new ResponseEntity<Medicine>(medicine, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Medicine> getAllMedics(Principal principal) {


        return medicineService.findAllMedics(principal.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable Long id, Principal principal) {
        medicineService.deleteMedicineById(id, principal.getName());
        return new ResponseEntity<String>("Medicine was deleted", HttpStatus.OK);
    }
}
