 
CREATE DATABASE book_management_store;
use book_management_store;
 
create table Member(member_Id int  auto_increment ,
First_name varchar (20) NOT NULL,
Last_name varchar (20) default null,
Contact_number varchar(15) NOT null,
Member_Address varchar (500) default null,
Email varchar (35) default null,
Allowed_Num_of_Books int default 3,
Num_of_Books_taken int default 0,
enrolled_date date default null,
primary key (member_Id)
);

select * from Member;

insert into Member values( 1 , 'Anu' , 'praxis' , 123 , 'Bangalore' , 'anu@praxis.com', 3,0,'2012/12/20');
insert into Member values( 2 , 'Dhanwan' , 'praxis' , 456 , 'Mumbai' , 'dhanwan@praxis.com', 4,0,'2012/12/20');
insert into Member values( 3 , 'KJ' , 'praxis' , 789 , 'Kolkata' , 'kj@praxis.com', 3,0,'2012/12/21');
insert into Member values( 4 , 'Sapt' , 'praxis' , 321 , 'Howrah' , 'sapt@praxis.com', 3,0,'2012/12/21');

 
 

create table Book(
Book_Id int not null auto_increment,
Book_name varchar (20)  NOT NULL,
ISBN int NOT NULL,
Author_name varchar (20) NOT NULL,
Publish_Date date default null,
Edition int default null,
Price float default null,
Category varchar(20) default null,
Num_of_Copies_available int NOT NULL,
primary key (book_Id)
);

insert into Book values (01, 'DMETL', 98754, 'SK', '2011-11-01' , 2, 200, 'education', 14);
insert into Book values (02, 'ADS', 12345, 'SS', '2012-12-15' , 3, 510 , 'education', 10);
insert into Book values (03, 'RDWHL', 65424, 'DJ', '2015-09-01',1, 100 , 'education', 8);
insert into Book values (04, 'CR7', 78424, 'KJ', '2021-09-26', 6, 1000  , 'Sports', 5);

select * from Book;
 
create table Issued(
issued_Id int auto_increment,
Book_id int not null ,
member_id int not null,
borrow_date date  not null,
returning_date date  not null,
status_book varchar(20)  not null,
returned_date date default null,
fine int default null,
primary key (issued_Id),
foreign key (Book_id) REFERENCES Book(Book_Id),
foreign key (member_id) REFERENCES Member(member_id)
);



 

insert into issued(issued_Id,Book_id,member_id,borrow_date,returning_date,status_book) values (001, 02, 1 , '2021-06-11' , '2021-07-11' , 'not returned');
insert into issued(issued_Id,Book_id,member_id,borrow_date,returning_date,status_book) values (002, 04, 3 , '2021-07-13' , '2021-08-13' , 'returned');
insert into issued(issued_Id,Book_id,member_id,borrow_date,returning_date,status_book) values (003, 01, 2 , '2021-08-15' , '2021-09-16' , 'returned');
insert into issued(issued_Id,Book_id,member_id,borrow_date,returning_date,status_book) values (004, 03, 4 , '2021-09-17' , '2021-09-16' , 'not returned');




