package back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Gen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private int id_word;
    private String paststimple;

    public int getId(){return id;}
    public void setId(int id){this.id=id;}
    
    public int getIdWord(){return id_word;}
    public void setIdWord(int id_word){this.id_word=id_word;}

    public String getPastSimple(){return paststimple;}
    public void setPastSimple(String pastsimple){this.paststimple=pastsimple;}

}
