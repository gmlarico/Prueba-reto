namespace demo_0.Domain.Entities
{
    public class MovieSchedule: BaseEntity
    {
        public int MovieId { get; set; }
        public int CinemaId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public Movie? Movie { get; set; }
        public Cinema? Cinema { get; set; }

        public List<MovieScheduleTime>? ScheduleTimes { get; set; }

    }
}
