namespace Famoser.GithubLoCCounter.Busines.Services.Interfaces
{
    public interface IConsoleService
    {
        void WriteToConsole(string line);
        void WriteSameLineToConsole(string line);

        string GetNextInputFromConsole();
    }
}
