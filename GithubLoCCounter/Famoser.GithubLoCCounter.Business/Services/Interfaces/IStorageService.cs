namespace Famoser.GithubLoCCounter.Busines.Services.Interfaces
{
    public interface IStorageService
    {
        string ReadOutFile(string fileName);

        bool WriteFile(string fileName, string fileContent);
    }
}
