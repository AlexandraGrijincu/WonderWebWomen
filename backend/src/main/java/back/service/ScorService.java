package back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import back.repository.UserRepository;

@Service
public class ScorService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void adaugaScor(int userId, int puncteNoi) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setScor(user.getScor() + puncteNoi);
            userRepository.save(user);
        });
    }

    @Transactional
    public void actualizeazaNivel(int userId, int nivelNou) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setNivel(nivelNou);
            userRepository.save(user);
        });
    }
}