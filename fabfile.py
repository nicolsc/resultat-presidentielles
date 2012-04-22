from fabric.api import *
import os,sys,time,re,subprocess,urllib2
sys.path.append("../joshfire-framework/build")
from joshfabric import *

try:
    import json
except:
    import simplejson as json

packageconf = json.load(open("package.json","r"))

env.export_dir = os.path.join(os.path.dirname(__file__),"export")

def prod():
  #env.hosts = ['88.190.234.121']
  #env.path = '/home/joshfire/exports/%s' % packageconf["name"]
  #env.user = 'joshfire'
  env.user="ubuntu"
  env.hosts = _getrunninginstances()
  env.path = "/home/ubuntu/exports/%s" % packageconf["name"]

def serve():
  local("node backend/server.js")
  
def export():
  #copy in export
  mycopy()

def mycopy():
  local("rm -rf export/ ; mkdir -p export/frontend/; ")
  local("cp frontend/index.html export/frontend/index.html")
  
  local("cp frontend/app.optimized.js export/frontend/app.optimized.js")
  
  local("cp -R frontend/css export/frontend/css")
  local("cp -R frontend/img export/frontend/img")
  local("cp -R export-optimized export/frontend/js")
  local("cp frontend/js/raphael.js export/frontend/js/raphael.js")
  local("cp -R backend export/")
  local("cp -R package.json export/")
  
  
def deploy():
  "PROD: deploys on ec2"
  env.release = time.strftime('%Y%m%d%H%M%S')
  export()
  setup_remote_environment()
  upload_tar_from_export()
  install_remote_npm()
  symlink_current_release()
  restart()

def ec2config():
  "PROD: export EC2 auth in env to deploy"
  os.environ["EC2_PRIVATE_KEY"]=os.path.dirname(__file__)+"/pk.pem"
  os.environ["EC2_CERT"]=os.path.dirname(__file__)+"/cert.pem"
  #print local("ec2-describe-reserved-instances-offerings --region us-east-1",True)
  local("chmod 600 elections.pem")
  local("ssh-add elections.pem")

def ec2list():
  ec2config()
  return local("ec2-describe-instances --private-key pk.pem --cert cert.pem --region eu-west-1 | grep running | cut -f17")
  
def _getrunninginstances():
  ec2config()
  return local("ec2-describe-instances --private-key pk.pem --cert cert.pem --region eu-west-1 --filter tag:Name='elections'|grep running|cut -f17",capture=True).split("\n")
  
def ec2start():
  "PROD: start instance"
  ec2config()
  
  #http://uec-images.ubuntu.com/releases/10.04/release/
  output = local("ec2-run-instances ami-945f6fe0 --instance-type m1.small --region eu-west-1 --g elections --key elections --private-key pk.pem --cert cert.pem",capture=True)
  instanceid = re.search("INSTANCE\s*(i-[a-z0-9-]+)",output).group(1)
  
  while "running" not in local("ec2-describe-instances --region eu-west-1  %s|grep INSTANCE|cut -f6" % instanceid,True):
    print "Instance still not up, waiting 5 more seconds..."
    time.sleep(5)
  
  print "Instance %s is now running... will now setup it" % instanceid
  
  with settings(host_string="ubuntu@"+local("ec2-describe-instances %s --region eu-west-1  --private-key pk.pem --cert cert.pem --region eu-west-1|grep INSTANCE|cut -f17" % instanceid,True).strip()):
    installnode()
    installnginx()

def installnginx():
  "PROD: install nginx on ec2 instance"
  sudo("apt-get install -y nginx")
  put("nginx-config","nginx-config")
  sudo("mv nginx-config /etc/nginx/sites-enabled/default")
  sudo("/etc/init.d/nginx restart")

def installnode():
  "PROD: install node on ec2 instance"
  version = "0.4.10"
  link = "http://nodejs.org/dist/node-v%s.tar.gz" % version
  run("mkdir -p build")
  sudo('apt-get update')
  sudo("apt-get install -y curl libssl-dev python gcc g++")
  run("curl %s > build/node.tar.gz" % link)
  run("cd build/ && rm -rf node/ && tar zxvf node.tar.gz && mv node-v%s node && cd node/ && ./configure && make" % version)
  sudo("cd build/node/ && make install")
  sudo("curl http://npmjs.org/install.sh | clean=yes sh ")
  sudo("npm install forever -g")

def restart():
  "PROD: restart server"
  path = env.path +'/releases/current'
  run("cd %s ; ls -l ; mkdir upload ; forever stop backend/server.js ; forever start -l %s/log.log -o %s/out.log -e %s/err.log backend/server.js" % (path, path, path, path), pty=False)

