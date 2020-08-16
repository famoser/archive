<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 27.12.2015
 * Time: 19:51
 */

include_once(__DIR__ . "/libs/PHPMailer-master/PHPMailerAutoload.php");


class Mailer extends PHPMailer
{
    /**
     * Save email to a folder (via IMAP)
     *
     * This function will open an IMAP stream using the email
     * credentials previously specified, and will save the email
     * to a specified folder. Parameter is the folder name (ie, Sent)
     * if nothing was specified it will be saved in the inbox.
     *
     * @author David Tkachuk <http://davidrockin.com/>
     */
    public function copyToFolder($folderPath = "SendByWebsite")
    {
        $message = $this->MIMEHeader . $this->MIMEBody;
        //$path = "";//"INBOX" . (isset($folderPath) && !is_null($folderPath) ? ".".$folderPath : ""); // Location to save the email
        $imapStream = imap_open("{imap.mail.hostpoint.ch:143/notls}SendByWebsite", $this->Username, $this->Password);
        /* $arr = imap_getmailboxes($imapStream, "{imap.mail.hostpoint.ch:143}", "*");
         Use this to find the Folder to save the sent email to
        if (is_array($arr)) {
            foreach ($arr as $key => $val) {
                echo "($key) ";
                echo imap_utf7_decode($val->name) . ",";
                echo "'" . $val->delimiter . "',";
                echo $val->attributes . "<br />\n";
            }
        } else {
            echo "imap_getmailboxes failed: " . imap_last_error() . "\n";
        }
        */
        if ($imapStream != false) {
            imap_append($imapStream, "{imap.mail.hostpoint.ch:143/notls" . $folderPath . "}", $message);
            imap_close($imapStream);
        }
    }
}

/** @noinspection PhpIncludeInspection */
include_once(__DIR__ . "/configuration.php");

function constructMailer()
{
    $mail = new Mailer;
    $mail->CharSet = 'utf-8';
    $mail->SetLanguage("de");
    $mail->isSMTP();
    $mail->Host = SMTP_SERVER;
    $mail->SMTPAuth = true;
    $mail->Username = SEND_FROM_EMAIL;
    $mail->Password = SEND_FROM_EMAIL_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port = SMTP_PORT;

    $mail->From = SEND_FROM_EMAIL;
    $mail->FromName = SEND_FROM_EMAIL_NAME;

    $mail->isHTML(true);

    return $mail;
}

function allKeysSet(array $arr, array $keys)
{
    foreach ($keys as $key) {
        if (!isset($arr[$key]))
            return false;
    }
    return true;
}

/** @noinspection PhpUndefinedConstantInspection */
$keys = [KEYS];
/** @noinspection PhpUndefinedConstantInspection */
$emailKey = [EMAIL_KEY];
/** @noinspection PhpUndefinedConstantInspection */
$nameKey = [NAME_KEY];

if (allKeysSet($_POST, $keys) || $_GET["test"] == "true") {
    $email = $_POST["email"];
    $name = $_POST["name"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    if ($_GET["t"] == "true") {
        echo "Test is active, Testemail is send to " . TEST_EMAIL;
        $email = TEST_EMAIL;
        $name = "Test Absender";
        $subject = "Test Subject";
        $message = "Test Message";
    }

    // ########## Step 1: Send Email to to-be-contacted Person ############
    $mail = constructMailer();

    $mail->addAddress(RESPOND_TO_EMAIL, RESPOND_TO_EMAIL_NAME);
    /** @noinspection PhpIllegalArrayKeyTypeInspection */
    $mail->addReplyTo($_POST[$emailKey], $_POST[$nameKey]);

    $mail->Subject = "Kontakanfrage auf " . PROJEKT_URL . " erhalten";

    $message = "Sie haben eine Nachricht auf " . PROJEKT_URL . " erhalten.\n\n";
    foreach ($keys as $key) {
        $message .= $key . ": " . $_POST[$key] . "\n\n";
    }

    $mail->Body = nl2br($message);
    $mail->AltBody = $message;

    if (!$mail->send()) {
        if ($_GET["test"] == "true")
            echo $mail->ErrorInfo;
        echo false;
        return;
    }
    $mail->copyToFolder("Sent");

    // ########## Step 2: Send Email to the Person which send the contact request ############
    $mail = constructMailer();

    $mail->From = SEND_FROM_EMAIL;
    $mail->FromName = SEND_FROM_EMAIL_NAME;
    /** @noinspection PhpIllegalArrayKeyTypeInspection */
    $mail->addAddress($_POST[$emailKey], $_POST[$nameKey]);
    $mail->addReplyTo(SEND_FROM_EMAIL);

    $mail->Subject = CONFIRMATION_SUBJECT;

    $mail->Body = nl2br(CONFIRMATION_CONTENT);
    $mail->AltBody = CONFIRMATION_CONTENT;

    if (!$mail->send()) {
        if ($_GET["t"] == "true")
            echo $mail->ErrorInfo;
        echo false;
        return;
    }
    $mail->copyToFolder("Sent");

    if ($_GET["test"] == "true")
        echo "Emails versandt";
    echo true;
} else {
    if ($_GET["test"] == "true")
        echo "Not all fields filled out";
    echo false;
}

?>