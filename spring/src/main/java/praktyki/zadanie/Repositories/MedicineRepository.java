package praktyki.zadanie.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import praktyki.zadanie.entity.Medicine;
import praktyki.zadanie.entity.User;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    public Medicine findMedicineById(Long id);

    Iterable<Medicine> findAllByUsername(String username);
}
