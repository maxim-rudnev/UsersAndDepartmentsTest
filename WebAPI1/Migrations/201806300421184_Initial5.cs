namespace WebAPI1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial5 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Users", "Department_Id", "dbo.Departments");
            DropIndex("dbo.Users", new[] { "Department_Id" });
            AddColumn("dbo.Users", "DepartmentId", c => c.Int(nullable: false));
            DropColumn("dbo.Users", "Department_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Users", "Department_Id", c => c.Int());
            DropColumn("dbo.Users", "DepartmentId");
            CreateIndex("dbo.Users", "Department_Id");
            AddForeignKey("dbo.Users", "Department_Id", "dbo.Departments", "Id");
        }
    }
}
