from db.models import Members
from db.database import get_db

def add_members():
    # Example usage:
    db_generator = get_db()
    db = next(db_generator)
     
    membersData = db.query(Members).all()
    if len(membersData) > 0 : 
        print("Members already Present")
        return
    
    members = [
        Members(name="Alice Johnson", email="alice.johnson@example.com", phone="1234567890", outstanding_debt=150.0),
        Members(name="Bob Smith", email="bob.smith@example.com", phone="2345678901", outstanding_debt=50.0),
        Members(name="Charlie Brown", email="charlie.brown@example.com", phone="3456789012", outstanding_debt=0.0),
        Members(name="Diana Prince", email="diana.prince@example.com", phone="4567890123", outstanding_debt=300.0),
        Members(name="Evan Davis", email="evan.davis@example.com", phone="5678901234", outstanding_debt=75.0),
    ]

    db.add_all(members)
    db.commit()
    print("Members inserted successfully")