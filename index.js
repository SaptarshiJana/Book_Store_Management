const mysql =require('mysql');
const express = require('express'); //server
var app=express(); //create server
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
  }));
 
 
var mysqlConnection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Anusha12345@',

    database:'book_management_store'
})

mysqlConnection.connect((err)=>{

    if(!err)
       console.log('DB coonectiob Succeed');
    else
       console.log('DB coonection Failed \n Err :'+JSON.stringify(err,undefined))
})

 
app.get('/',(req,res)=>{
    res.send('hi')

})

//to get all the books available
app.get('/books/getAll', (req, res) => {
    mysqlConnection.query('SELECT * FROM Book', (err, rows, fields) => {
        if (!err){
            
            res.send(rows)
        }
            
        else
            console.log(err);
    })
});
//to get a perticular book
app.get('/books/get/:id', (req, res) => {
    var id=req.params.id
    mysqlConnection.query('SELECT * FROM Book where Book_id=?',[id], (err, rows, fields) => {
        if (!err){
            
            res.send(rows)
        }
            
        else
            console.log(err);
    })
});
 


// to add the books
 
app.post('/books/addBooks',(req,res)=>
{    
    
    sql="call book_management_store.add_Or_Update_books(?,?,?,?,?,?,?,?,?);"
     var id=0
     var book=req.body;
  // req.body.book_name
    
    mysqlConnection.query(sql,[book.Book_name,book.ISBN,book.Author_name,book.Publish_Date,book.Edition,book.Price,book.Category,book.Num_of_Copies_available,id], (err, result) => 
    {
        if (!err) {
            res.send('Record added sucessfully');
             
            
        } 
        else{
            console.log(err);
             
             
        }
    })
})


//update perticular book
app.post('/books/updateBooks/:id',(req,res)=>{
    var id=req.params.id;
    var book=req.body;
    var sql= "call book_management_store.add_Or_Update_books(?,?,?,?,?,?,?,?,?);"
    mysqlConnection.query(sql,[book.Book_name,book.ISBN,book.Author_name,book.Publish_Date,book.Edition,book.Price,book.Category,book.Num_of_Copies_available,id],(err,data)=>{
        if(err) throw err;
        else res.send(data)
        console.log(data.affectedRows+'records updated');
        
    })
})
//delete the perticular book
app.delete('/books/deleateBook/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Book WHERE Book_Id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
////////////   Member /////////////////////////////


//to get all the Member  
app.get('/Member/getAll', (req, res) => {
    mysqlConnection.query('SELECT * FROM Member', (err, rows, fields) => {
        if (!err){
            console.log(rows);
            res.send(rows)
        }
            
        else
            console.log(err);
    })
});


 


// to add the Member
 
app.post('/Member/addMember',(req,res)=>
{   
    var id=0;
     
 
    sql="call book_management_store.add_Or_Update_Member(?,?,?,?,?,?,?,?,?);"
     var m=req.body;
    mysqlConnection.query(sql,[m.First_name,m.Last_name,m.Contact_number,m.Member_Address,m.Email,m.Allowed_Num_of_Books,m.Num_of_Books_taken,m.enrolled_date,id] , (err, result) => 
    {
        if (!err) {
            res.send('Sucessfully added a member');
            
        } 
        else{
            console.log(err);
             
             
        }
    })
})


//update perticular Member
app.post('/Member/updateMember/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id)
    sql="call book_management_store.add_Or_Update_Member(?,?,?,?,?,?,?,?,?);"
     var m=req.body;
    mysqlConnection.query(sql,[m.First_name,m.Last_name,m.Contact_number,m.Member_Address,m.Email,m.Allowed_Num_of_Books,m.Num_of_Books_taken,m.enrolled_date,id],(err,data)=>{
        if(err) throw err;
        else res.send(data)
        console.log(data.affectedRows+'records updated');
        
    })
})
//delete the perticular Member
app.delete('/Member/deleateMember/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Member WHERE member_Id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
////////////   Issued /////////////////////////////


//to get all the Issuer  
app.get('/Issued/getAll', (req, res) => {
    mysqlConnection.query('SELECT * FROM Issued', (err, rows, fields) => {
        if (!err){
            console.log(rows);
            res.send(rows)
        }
            
        else
            console.log(err);
    })
});


 


// to add the Issuer
 
app.post('/Issued/addIssuer',(req,res)=>
{   
  var id=0
  sql="call book_management_store.add_Or_update_issue(?,?,?,?,?,?,?,?);"
  var updateData=req.body;
  var  book_id= req.body.Book_id;
  var  member_id=req.body.member_id;
      sql_book = "select Num_of_Copies_available from Book where Book_Id=?"
      sql_member="select Allowed_Num_of_Books from Member where member_Id=? "
      mysqlConnection.query(sql_book,book_id,(err ,result)=>{
          if(!err){
              console.log(result[0].Num_of_Copies_available)
          if(result[0].Num_of_Copies_available>0)
          {   
      
            mysqlConnection.query(sql_member,member_id,(err,result)=>{
                if(!err){
                   
                     if(result[0].Allowed_Num_of_Books>0){

                      

                     
    mysqlConnection.query(sql,[updateData.Book_id,updateData.member_id,updateData.borrow_date,updateData.returning_date,updateData.status_book,updateData.returned_date,updateData.fine,id], (err, result) => 
    {
                            if (!err) {
            
            res.send('Issued a book');
            
        } 
        else{
            console.log(err);
             
             
        }
    })//conn
           }
            else{
                console.log("U have reached maximum limit")
                res.send("U have reached maximum limit")
            }

            }
            else
            console.log(err)
            })


          }else{
              console.log("we do not hv enough copies")
              res.send("we do not hv enough copies")
          }

}
else console.log(err)
});
})


//update perticular Issuer
app.post('/Issued/updateIssued/:id',(req,res)=>
{
    sql="call book_management_store.add_Or_update_issue(?,?,?,?,?,?,?,?);"
    console.log("in update");
    var id=req.params.id;
    var updateData=req.body;
    
    var member_id=req.body.member_id;
     
    mysqlConnection.query(sql,[updateData.Book_id,updateData.member_id,updateData.borrow_date,updateData.returning_date,updateData.status_book,updateData.returned_date,updateData.fine,id],(err,data)=>{
        if(err) throw err;
        else{ 
             

                    
                    


        res.send(data)
        console.log(data.affectedRows+'records updated');
                
        
    }

 

})
})


//delete the perticular Issuer
app.delete('/Issued/deleateIssuer/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Issued WHERE issued_Id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});


app.listen(3000,()=>{
    console.log("express server running at port number 3000")

});

 