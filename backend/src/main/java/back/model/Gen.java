package back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Gen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "id_word", referencedColumnName = "id")
    private Word word;
    private String roPastSimple;
    private String enPastSimple;

    public int getId(){return id;}
    public void setId(int id){this.id=id;}
    
    public int getIdWord(){return word.getId();}
    public void setIdWord(int id_word){word.setId(id_word);}

    public String getRoPastSimple(){return roPastSimple;}
    public void setRoPastSimple(String roPastSimple){this.roPastSimple=roPastSimple;}

    public String getEnPastSimple(){return enPastSimple;}
     public void setEnPastSimple(String enPastSimple){this.enPastSimple=enPastSimple;}

}
