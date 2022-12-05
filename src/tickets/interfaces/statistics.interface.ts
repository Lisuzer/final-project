export interface IStatistics {
  totalTickets: number;
  totalPrice: number;
  ticketStatus: {
    BOUGHT: number;
    BOOKED: number;
  };
}
