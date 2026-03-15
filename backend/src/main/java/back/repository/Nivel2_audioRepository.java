package back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import back.model.Gen; 

@Repository
public interface Nivel2_audioRepository extends JpaRepository<Gen , Integer> {
}