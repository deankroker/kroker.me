<?php
	if(!empty($_POST['email']))
	{
		$to="hello@endlesstone.com";
		$email = $_POST['email'];
		$name = $_POST['name'];
		$subject = "New Contact From $name";
		$message = $_POST['message'];
		$headers = "From:" . $email;
		echo mail($to,$subject,$message,$headers);
      
        $data = array("value1" => $email, "value2" => $name, "value3" => $message);
        $data_string = json_encode($data);
		
		if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
			//Valid email!

			$ch = curl_init("https://maker.ifttt.com/trigger/form_submitted/with/key/cGOWs6Ut6i3rlsz5mqDYRE");
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
			    'Content-Type: application/json'                                                                                                                                       
			));                                                                                                                   
			
					                                                                                                                     
			$result = curl_exec($ch);
			echo $result;
		} else {
			echo "Invalid email";
		}
	}
?>
