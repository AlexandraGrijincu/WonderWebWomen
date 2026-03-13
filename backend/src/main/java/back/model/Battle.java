package back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Battle {
    @Id
    private int id;
    private int nivel;
    private int nr_verbe;

    public int getId(){return id;}
    public void setId(int id){this.id=id;}

    public int getNivel(){return nivel;}
    public void setNivel(int nivel){this.nivel=nivel;}

    public int getNrVerbe(){return nr_verbe;}
    public void setNrVerbe(int nr_verbe){this.nr_verbe=nr_verbe;}
}
