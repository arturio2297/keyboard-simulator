package com.backend.data.respository;

import com.backend.data.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    User getByEmail(String email);

    @Query("SELECT u FROM User AS u WHERE u.email = ?1 AND (u.token.access = ?2 OR u.token.refresh = ?2)")
    Optional<User> findByEmailAndToken(String email, String token);
}
