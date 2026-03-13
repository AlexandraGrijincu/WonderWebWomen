package back.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Tabelul de backend pentru users
 */
@Entity
@Table(name = "USERS")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    private String username;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "parola", length = 100)
    private String parola;

    @Column(name = "nivel")
    private int nivel;


    public int getId() { return id; }
    public void setId(int id) { this.id = id; }


    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }


    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }


    public String getParola() { return parola; }
    public void setParola(String parola) { this.parola = parola; }

    public Integer getNivel() { return nivel; }
    public void setNivel(Integer nivel) { this.nivel = nivel; }
}
