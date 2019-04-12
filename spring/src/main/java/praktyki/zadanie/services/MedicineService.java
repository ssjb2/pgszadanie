package praktyki.zadanie.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import praktyki.zadanie.Repositories.MedicineRepository;
import praktyki.zadanie.Repositories.UserRepository;
import praktyki.zadanie.entity.Medicine;
import praktyki.zadanie.entity.User;
import praktyki.zadanie.exceptions.MedicineNotFoundException;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private UserRepository userRepository;

    public Medicine saveOrUpdateMedicine(Medicine medicine, String username){


        try{
        if(medicine.getId() !=null){
            Medicine existingMedicine = medicineRepository.findMedicineById(medicine.getId());
            if(existingMedicine !=null &&(!existingMedicine.getUsername().equals(username))){
                throw new MedicineNotFoundException("Medicine not found in your account");
            }
        }
        User user = userRepository.findByUsername(username);
        medicine.setUser(user);
        medicine.setUsername(username);

       return medicineRepository.save(medicine);}
        catch (Exception e){
            throw new MedicineNotFoundException("error");
        }
    }

    public Medicine findMedicineById(Long id, String username) {
        Medicine medicine = medicineRepository.findMedicineById(id);
        if (medicine==null){
            throw new MedicineNotFoundException("Medicine does not exist");
        }
        if(!medicine.getUsername().equals(username)){
            throw new MedicineNotFoundException("Medicine not found in your account");
        }
        return medicine;
    }

    public Iterable<Medicine> findAllMedics(String username) {
        return medicineRepository.findAllByUsername(username);
    }

    public void deleteMedicineById(Long id, String username) {
        medicineRepository.delete(findMedicineById(id, username));
    }
}
