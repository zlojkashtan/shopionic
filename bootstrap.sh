# Enable port forwarding from 8080 to 80 and add forever cronjob
# ---------------
# https://gist.github.com/kentbrew/776580
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j     REDIRECT --to-ports 8080
iptables-save > /etc/iptables.rules
echo "@reboot sudo iptables-restore < /etc/iptables.rules" >> cronjobs
echo "@reboot /home/ubuntu/.node/bin/forever start -a -e /vagrant/forever-err.log -l /vagrant/forever.log -o /vagrant/forever-out.log -c /usr/bin/node /vagrant/app.js" >> cronjobs
sudo -u ubuntu crontab -l -u ubuntu | cat - cronjobs | crontab -u ubuntu -
rm cronjobs

echo "Please run Node.js setup script with: 'source <(curl -sL https://gist.githubusercontent.com/georgschlenkhoff/2b7bb324444a14b84d31/raw/21010d0a3853865ee8933614e289f14e5429bc0a/setup)' after login with vagrant ssh"
