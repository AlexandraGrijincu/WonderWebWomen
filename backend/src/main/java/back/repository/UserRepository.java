package back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import back.model.Users;

/**
 * Repository pentru a gasi utilizatorii dupa email
 */
@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
   
}