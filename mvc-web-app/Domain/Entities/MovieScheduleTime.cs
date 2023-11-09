using System.ComponentModel.DataAnnotations.Schema;

namespace demo_0.Domain.Entities
{
    public class MovieScheduleTime: BaseEntity
    {
        public string? Hour { get; set; }
        public int MovieScheduleId { get; set; }
        [NotMapped]
        public bool Selected { get; set; }

        public MovieSchedule? MovieSchedule { get; set; }
    }
}
