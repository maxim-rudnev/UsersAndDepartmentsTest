namespace WebAPI1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Department_Id", c => c.Int());
            CreateIndex("dbo.Users", "Department_Id");
            AddForeignKey("dbo.Users", "Department_Id", "dbo.Departments", "Id");
            DropColumn("dbo.Users", "DepartmentId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Users", "DepartmentId", c => c.Int(nullable: false));
            DropForeignKey("dbo.Users", "Department_Id", "dbo.Departments");
            DropIndex("dbo.Users", new[] { "Department_Id" });
            DropColumn("dbo.Users", "Department_Id");
        }
    }
}
