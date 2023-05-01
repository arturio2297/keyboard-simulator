package com.backend.data.respository;

import com.backend.data.model.code.Code;
import com.backend.data.model.code.CodeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CodeRepository extends JpaRepository<Code, Long> {

    Optional<Code> findByEmailAndType(String email, CodeType type);

    Optional<Code> findByValueAndEmailAndType(String value, String email, CodeType type);
}
