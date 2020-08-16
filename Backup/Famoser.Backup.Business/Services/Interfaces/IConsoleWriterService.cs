namespace Famoser.Backup.Business.Services.Interfaces
{
    public interface IConsoleService
    {
        void WriteToConsole(string line);
        void WriteSameLineToConsole(string line);

        string GetNextInputFromConsole();
    }
}
