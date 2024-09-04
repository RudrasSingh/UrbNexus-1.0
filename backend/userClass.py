class Employee:
    def __init__(self,id,email,profilePicture,name,dob,salary,contact,department ):
        self.name = name
        self.age = age
        self.salary = salary
        self.email = email
    def showDetails(self):
        return f'{self.name} is {self.age} years old and earns {self.salary}'
    
class Officer(Employee):
    def __init__(self, name, age, salary, rank):
        super().__init__(name, age, salary)
        self.rank = rank

    def __str__(self):
        return f'{self.name} is an officer with rank {self.rank}'
